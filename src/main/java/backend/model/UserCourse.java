//package backend.model;
//
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//public class UserCourse {
//
//    @Id
//    private long ID;
//
//    @ManyToOne
//    @JoinColumn(name = "id")
//    User user;
//
//    @ManyToOne
//    @JoinColumn(name = "courseID")
//    Course course;
//
//    public UserCourse() {
//    }
//
//    public UserCourse(long ID, User user, Course course) {
//        this.ID = ID;
//        this.user = user;
//        this.course = course;
//    }
//
//    public long getID() {
//        return ID;
//    }
//
//    public void setID(long ID) {
//        this.ID = ID;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Course getCourse() {
//        return course;
//    }
//
//    public void setCourse(Course course) {
//        this.course = course;
//    }
//}
