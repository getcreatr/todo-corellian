using System.ComponentModel.DataAnnotations;
using HotChocolate;

namespace TodoApi.Models
{
    public class TaskItem
    {
        [GraphQLType(typeof(IdType))]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
    
    public enum TaskStatus
    {
        Pending,
        Completed
    }
}