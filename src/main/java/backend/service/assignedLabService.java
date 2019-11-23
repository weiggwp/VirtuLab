package backend.service;

import backend.model.AssignedLab;
import backend.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import backend.repository.AssignedLabRepository;
import org.springframework.stereotype.Service;

@Service
public class assignedLabService {

    @Autowired
    AssignedLabRepository assignedLabRepository;


    public void addAssignedLab(AssignedLab assignedLab) {
        assignedLabRepository.save(assignedLab);
    }

    public void deleteAssignedLab(AssignedLab assignedLab) {
        assignedLabRepository.delete(assignedLab);
    }

    public void deleteAssignedLab(long id) {assignedLabRepository.deleteById(id);}

    public void findCourseById(long id) {assignedLabRepository.findById(id);}

}
