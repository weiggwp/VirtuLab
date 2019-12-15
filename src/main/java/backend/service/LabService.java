package backend.service;

import backend.dto.LabDTO;

import backend.model.Lab;
import backend.model.User;
import backend.repository.LabRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import backend.dto.LabDTO;
import backend.model.Lab;
import backend.repository.LabRepository;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Page<Lab> pageAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Lab> pageLab = labRepository.findAll(pageable);
        return pageLab;
    }

    public Page<Lab> pageAllPublicLabs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Lab> pageLab = labRepository.findAllByOpen(1, pageable);
        return pageLab;
    }

    public Page<Lab> pageLabsByTags(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        ArrayList<String> list = new ArrayList<>();
        list.add("rr");
        Page<Lab> pageLab = labRepository.findByTagsIn(list, pageable);
        return pageLab;
    }

//    public Page<Lab> pageLab



    public Optional<Lab> findLabByLabID(long id) { return labRepository.findLabByLabID(id); }
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

    public Page<Lab> pagePrivateLabs(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Lab> pageLabs = labRepository.findBy(user, pageable);
        return pageLabs;
    }




}
