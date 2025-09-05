using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public async Task<List<TaskItem>> GetAllTasks(TodoContext context)
        {
            return await context.Tasks.ToListAsync();
        }

        public async Task<TaskItem?> GetTaskById(TodoContext context, int id)
        {
            return await context.Tasks.FindAsync(id);
        }
    }
}