using Microsoft.AspNetCore.Mvc;
using StudentEnrollment.API.Data;
using StudentEnrollment.API.Models;

namespace StudentEnrollment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // B1. Retrieve Student Records
        [HttpGet]
        public IActionResult GetStudents()
        {
            return Ok(_context.Students.ToList());
        }

        // B2. Register New Student
        [HttpPost]
        public IActionResult RegisterStudent([FromBody] Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return Ok(student);
        }

        // B3. Update Enrollment Status
        [HttpPut("{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] string newStatus)
        {
            var student = _context.Students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();

            student.EnrollmentStatus = newStatus;
            _context.SaveChanges();
            return Ok(student);
        }

        // B4. Delete Student Record
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = _context.Students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            _context.SaveChanges();
            return Ok();
        }
    }
}