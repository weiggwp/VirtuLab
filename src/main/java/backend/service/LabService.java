package backend.service;

import backend.model.Lab;
import backend.repository.LabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabService {

    @Autowired
    LabRepository labRepository;

    public void saveLab(Lab lab) {labRepository.save(lab);}

    public void deleteAllLab() {labRepository.deleteAll();}

    public void deleteById(long id) {labRepository.deleteById(id);}

}
