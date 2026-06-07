// Simple in-memory cache with TTL
class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Get cached value if it exists and hasn't expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached value or null if not found/expired
   */
  get(key) {
    if (!this.cache.has(key)) return null;

    const item = this.cache.get(key);
    if (item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Set cache value with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttlSeconds - Time to live in seconds (default: 300)
   */
  set(key, value, ttlSeconds = 300) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Delete specific cache key
   * @param {string} key - Cache key to delete
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear cache keys matching a pattern
   * @param {string|RegExp} pattern - Pattern to match
   */
  clearPattern(pattern) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

const cacheManager = new CacheManager();

/**
 * Middleware to cache GET requests
 * @param {number} ttlSeconds - Cache TTL in seconds (default: 300)
 * @returns {Function} Express middleware
 */
const cacheMiddleware = (ttlSeconds = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key from URL and query params
    const cacheKey = `${req.path}:${JSON.stringify(req.query)}`;

    // Check if response is cached
    const cachedResponse = cacheManager.get(cacheKey);
    if (cachedResponse) {
      return res.json({ ...cachedResponse, cached: true });
    }

    // Intercept res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = function(data) {
      // Only cache successful responses
      if (res.statusCode === 200) {
        cacheManager.set(cacheKey, data, ttlSeconds);
      }
      return originalJson(data);
    };

    next();
  };
};

/**
 * Invalidate cache for a specific resource type
 * @param {string} resourceType - Type of resource (e.g., 'donations', 'members')
 */
const invalidateCache = (resourceType) => {
  cacheManager.clearPattern(new RegExp(`^/api/${resourceType}`));
};

module.exports = {
  cacheManager,
  cacheMiddleware,
  invalidateCache,
};
