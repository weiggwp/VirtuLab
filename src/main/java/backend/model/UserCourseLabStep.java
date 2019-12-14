package backend.model;


import javax.persistence.*;

@Entity
public class UserCourseLabStep {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userCourseLabStepID;

    @ManyToOne
    @JoinColumn(name = "userCourseLabID")
    private UserCourseLab userCourseLab;

    @ManyToOne
    @JoinColumn(name = "stepID")
    private Step step;

    private int triesPerStep;
    private int complete;

    public UserCourseLabStep() {
    }

    public UserCourseLabStep(UserCourseLab userCourseLab, Step step, int triesPerStep) {
        this.userCourseLab = userCourseLab;
        this.step = step;
        this.triesPerStep = triesPerStep;
    }

    public long getUserCourseLabStepID() {
        return userCourseLabStepID;
    }

    public void setUserCourseLabStepID(long userCourseLabStepID) {
        this.userCourseLabStepID = userCourseLabStepID;
    }

    public UserCourseLab getUserCourseLab() {
        return userCourseLab;
    }

    public void setUserCourseLab(UserCourseLab userCourseLab) {
        this.userCourseLab = userCourseLab;
    }

    public Step getStep() {
        return step;
    }

    public void setStep(Step step) {
        this.step = step;
    }

    public int getTriesPerStep() {
        return triesPerStep;
    }

    public void setTriesPerStep(int triesPerStep) {
        this.triesPerStep = triesPerStep;
    }

    public int getComplete() {
        return complete;
    }

    public void setComplete(int complete) {
        this.complete = complete;
    }
}
