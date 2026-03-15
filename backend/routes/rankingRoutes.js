import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Obtener ranking de usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate("rolId", "nombre")
      .select("nombre email rolId createdAt")
      .limit(100)
      .lean();

    if (!usuarios || usuarios.length === 0) {
      return res.json([]);
    }

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
