const User = require('../models/user.model');
const ActivityLogService = require('./activityLog.service');

exports.register = async (userData) => {
    const user = await User.create(userData);
    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Update last login? Optional.
    // ActivityLogService.logActivity({ userId: user._id, action: 'LOGIN' });

    return user;
};

const crypto = require('crypto');

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('There is no user with that email');
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // In a real app, send email here
    console.log(`[MOCK EMAIL SERVICE] Password reset token for ${email}: ${resetToken}`);
    console.log(`[MOCK EMAIL SERVICE] URL: http://localhost:5173/reset-password/${resetToken}`);

    return resetToken;
};

exports.resetPassword = async (resetToken, newPassword) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Invalid token');
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return user;
};
