using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        [UseDbContext(typeof(TodoContext))]
        public async Task<TaskItem> CreateTask([ScopedService] TodoContext context, CreateTaskInput input)
        {
            var task = new TaskItem
            {
                Title = input.Title,
                Description = input.Description,
                Status = TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync();
            
            return task;
        }

        [UseDbContext(typeof(TodoContext))]
        public async Task<TaskItem> UpdateTaskStatus([ScopedService] TodoContext context, UpdateTaskStatusInput input)
        {
            var task = await context.Tasks.FindAsync(input.Id);
            if (task == null)
            {
                throw new GraphQLException($"Task with ID {input.Id} not found.");
            }

            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;
            
            await context.SaveChangesAsync();
            
            return task;
        }

        [UseDbContext(typeof(TodoContext))]
        public async Task<bool> DeleteTask([ScopedService] TodoContext context, int id)
        {
            var task = await context.Tasks.FindAsync(id);
            if (task == null)
            {
                return false;
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            
            return true;
        }
    }

    public record CreateTaskInput(string Title, string? Description);
    public record UpdateTaskStatusInput(int Id, TaskStatus Status);
}