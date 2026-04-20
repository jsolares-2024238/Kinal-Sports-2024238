using System;
using AuthService.Domain.Entities;

namespace AuthService.Domain.Interface;

public interface IRoleRepository
{
    Task<Role?>GetByNameAsync(string roleName);// devuelve un role que no venga vacio

    Task<int> CountUsersInRoleAsync(string roleName);// cuenta cuantos roles hay en general
    Task<IReadOnlyList<User>> GetUsersByRoleAsync(string roleName);// devuelve los usuario que estan asignados a un role

    Task<IReadOnlyList<string>> GetUserRoleNamesAsync(string userId);//buscar un usuario con un role en especifico
}
