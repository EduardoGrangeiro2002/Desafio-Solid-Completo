import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    try {
      return response.json(
        this.listAllUsersUseCase.execute({ user_id } as { user_id: string })
      );
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
