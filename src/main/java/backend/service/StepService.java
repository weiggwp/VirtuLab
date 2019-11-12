package backend.service;

import backend.model.Step;
import backend.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StepService {

    @Autowired
    StepRepository stepRepository;

    public void addStep(Step step) {
        stepRepository.save(step);
    }
}
