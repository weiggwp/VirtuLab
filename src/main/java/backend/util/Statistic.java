package backend.util;

import backend.model.*;

public class Statistic {

    public static double[] findCompletionStats(User user) {

        //  stats[0] = completed labs
        double[] stats = new double[2];
        double n = 0;
        double size = user.getUserCourseLabList().size();
        if (user.getRole().equals("student")) {

            for (UserCourseLab userCourseLab: user.getUserCourseLabList()) {
                if (userCourseLab.getComplete() > 0) n++;
            }
        }
        return findPercentage(n, size);
    }

    public static double[] findCourseCompletionStats(Course course) {

        //  stats[0] = completed labs
        double n = 0;
        double size = course.getUserCourseLabList().size();
        for (UserCourseLab userCourseLab: course.getUserCourseLabList()) {
            if (userCourseLab.getComplete() > 0) n++;
        }

        return findPercentage(n, size);
    }

    public static double[] findPercentage(double n, double size){

        double[] stats = new double[2];
        double completeRate = n / size;
        double incompleteRate = 1 - completeRate;
        stats[0] = completeRate;
        stats[1] = incompleteRate;
        return stats;

    }









}
