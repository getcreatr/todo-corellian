using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public async Task<List<TaskItem>> GetAllTasks(TodoContext context)
        {
            return await context.Tasks.OrderBy(t => t.Status).ThenByDescending(t => t.UpdatedAt).ToListAsync();
        }
    }
}