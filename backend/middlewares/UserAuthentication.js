import jwt from 'jsonwebtoken';

const Userauthentication =  (customMessage) => {
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

       req.body.userId=decoded_token.id
        

        // If verification is successful, call the next middleware
        next();
    } catch (error) {
        console.log("Error at User authentication:", error);
        return res.status(500).json({ success: false, message: "Authentication failed", error: error.message });
    }
}
}

export default Userauthentication;
