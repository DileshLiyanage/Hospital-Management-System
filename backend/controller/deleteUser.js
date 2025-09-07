const userModel = require("../models/userModel");

async function deleteUser(req, res) {
    try {
        const { id } = req.params; // Get user ID from URL params

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        await userModel.findByIdAndDelete(id); // Delete user

        res.json({
            message: "User deleted successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error deleting user",
            error: true,
            success: false,
        });
    }
}

module.exports = deleteUser
