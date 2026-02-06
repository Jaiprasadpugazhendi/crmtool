const AuthService = require('../services/auth.service');
const ActivityLogService = require('../services/activityLog.service');

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await AuthService.register({ name, email, password, role });

        // Log activity
        await ActivityLogService.logActivity({
            userId: user._id,
            action: 'USER_REGISTERED',
            details: { email }
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);

        // Log activity
        await ActivityLogService.logActivity({
            userId: user._id,
            action: 'LOGIN',
            details: { email }
        });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        if (err.message === 'Invalid credentials') {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await AuthService.forgotPassword(email);

        res.status(200).json({
            success: true,
            message: 'Email sent'
        });
    } catch (err) {
        if (err.message === 'There is no user with that email') {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        const user = await AuthService.resetPassword(resetToken, password);

        sendTokenResponse(user, 200, res);
    } catch (err) {
        if (err.message === 'Invalid token') {
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        next(err);
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};
