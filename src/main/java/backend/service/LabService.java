package backend.service;

import backend.dto.LabDTO;

import backend.model.Lab;
import backend.repository.LabRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import backend.dto.LabDTO;
import backend.model.Lab;
import backend.repository.LabRepository;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabService {


    @Autowired
    LabRepository labRepository;

    public void saveLab(Lab lab) {labRepository.save(lab);}

    public void deleteAllLab() {labRepository.deleteAll();}

    public void deleteById(long id) {labRepository.deleteById(id);}


    private ModelMapper modelMapper = new ModelMapper();


    public Lab findByLabID(long id){
        return labRepository.findByLabID(id);
    }

    public long createNewLab(Lab lab){
        return labRepository.save(lab).getLabID();


    }
    public List<Lab> getAllLabs(){
        return labRepository.findAll();
    }
    public void save( LabDTO labDTO) {
        Lab lab = new Lab();
        if( labDTO != null){
            modelMapper.map(labDTO,lab);
        }
        labRepository.save(lab);
    }



}
