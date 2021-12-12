import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const UserIsAdmin = this.usersRepository.findById(user_id);
    if (UserIsAdmin.admin === true) {
      const allUsers = this.usersRepository.list();
      return allUsers;
    }
    throw new Error("Usuário nao permitido");
  }
}

export { ListAllUsersUseCase };
