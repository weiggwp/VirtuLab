package backend.service;

import backend.dto.LabDTO;
import backend.model.Lab;
import backend.repository.LabRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabService {
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private LabRepository labRepository;

    public Lab findByLabID(long id){
        return labRepository.findByLabID(id);
    }

    public long createNewLab(LabDTO labDTO){
        Lab lab = new Lab();
        if( labDTO != null){
            modelMapper.map(labDTO,lab);
        }
//        if(!labRepository.existsById(lab.getLabID())
//        {
//            save(lab);
//        }
        return labRepository.save(lab).getLabID();


    }
    public void save( LabDTO labDTO) {
        Lab lab = new Lab();
        if( labDTO != null){
            modelMapper.map(labDTO,lab);
        }
        labRepository.save(lab);
    }
}
