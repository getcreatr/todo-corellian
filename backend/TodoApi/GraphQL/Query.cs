using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(TodoContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<TaskItem> GetAllTasks([ScopedService] TodoContext context)
        {
            return context.Tasks;
        }

        [UseDbContext(typeof(TodoContext))]
        public async Task<TaskItem?> GetTaskById([ScopedService] TodoContext context, int id)
        {
            return await context.Tasks.FindAsync(id);
        }
    }
}