import jwt from 'jsonwebtoken';

const adminauthentication =  (customMessage) => {
    return (req, res, next) => {
    try {
        // Access the authorization header directly
        const authHeader = req.headers.authorization;

        // Check if the authorization header is present and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: customMessage });
        }

        // Extract the token by splitting the string
        const checkToken = authHeader.split(' ')[1];

        // Decode the token to verify the admin credentials
        const decoded_token = jwt.verify(checkToken, process.env.JWT_SECRET_KEY);

        // Check if the decoded token contains the correct admin email
        if (decoded_token.email !== process.env.ADMIN_EMAIL || decoded_token.password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Invalid Admin Email or Password" });
        }
        

        // If verification is successful, call the next middleware
        next();
    } catch (error) {
        console.log("Error at admin authentication:", error);
        return res.status(500).json({ success: false, message: "Authentication failed", error: error.message });
    }
}
}

export default adminauthentication;
