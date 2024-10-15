// create and export router
const express = require("express");
const router = express.Router();
module.exports = router;

// import prisma client so we can access database
const prisma = require("../prisma");

//GET /users sends array of all users
router.get("/", async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (e) {
      next(e);
    }
  });

  //GET /users/:id should send the user specified by id.
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      // We can throw an error instead of checking for a null user
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: +id },
        include: { playlists: true },
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  //POST /users/:id/playlists
  router.post("/:id/playlists", async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      // ownerId has been converted to numbers
      const playlist = await prisma.playlist.create({
        data: { name, description, ownerId: +id },
      });
      res.status(201).json(playlist);
    } catch (e) {
      next(e);
    }
  });