import { Request, Response } from "express";
import { notFound404 } from "../constants/staticHTML.js";

export const defaultRoutes = (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(notFound404);
  } else if (req.accepts(["json"])) {
    res.json({ error: "Not Found" });
  } else {
    res.type("txt").send("Error 404: Not Found");
  }
};
