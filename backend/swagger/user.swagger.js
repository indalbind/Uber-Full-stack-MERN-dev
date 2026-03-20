/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     example: indal
 *                   lastname:
 *                     type: string
 *                     example: bind
 *               email:
 *                 type: string
 *                 example: indal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: indal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 * 
 * /api/users/profile:
 *  get:
 *    summary: Get user profile
 *    tags: [User]
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: User all profile retrieved successfully
 * 
 * /api/users/logout:
 * post:
 *    summary: Logout a user    
 *    tags: [User]
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      200:
 *       description: User logged out successfully
 * 
 */
