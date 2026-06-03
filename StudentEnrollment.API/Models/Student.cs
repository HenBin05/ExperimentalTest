namespace StudentEnrollment.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public required string StudentName { get; set; }
        public required string Programme { get; set; }
        public required string EnrollmentStatus { get; set; }
    }
}