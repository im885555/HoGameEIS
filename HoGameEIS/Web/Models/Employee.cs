using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class Employee 
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string CName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string JobTitle { get; set; }
        [Required]
        public int JobLevel { get; set; }
        public bool? Sex { get; set; }
        [Required]
        public DateTime CheckInDate { get; set; }
        [Required]
        public string Tel { get; set; }
        [Required]
        public string EMail { get; set; }
        public string HomeAddress { get; set; }
        public string CommAddress { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyContactTel { get; set; }
        public string Password { get; set; }
    }
}