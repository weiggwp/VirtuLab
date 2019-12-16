package backend.repository;

import backend.model.Lab;

import backend.model.User;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface LabRepository extends PagingAndSortingRepository<Lab, Long> {

    Lab findByLabID(long id);

    Optional<Lab> findLabByLabID(long id);

    Optional<Lab> findLabByName(String name);

    List<Lab> findAll();

    @Override
    Page<Lab> findAll(Pageable pageable);

    Page<Lab> findAllByOpen(int isOpen, Pageable pageable);

    Page<Lab> findAllByTagsContains(List<String> list, Pageable pageable);

    Page<Lab> findAllByTags(ArrayList<String> list, Pageable pageable);

    Page<Lab> findAllByTags(String tags, Pageable pageable);

    Page<Lab> findAllByTagsContaining(List<String> list, Pageable pageable);

    Page<Lab> findLabsByTagsIn(List<String> list, Pageable pageable);

    Page<Lab> findByTagsIn(List<String> list, Pageable pageable);

    @Query("select lab from User p inner join p.labs lab where p = :parent order by lab.lastModified desc")
    Page<Lab> findBy(@Param("parent") User user, Pageable pageable);


}
