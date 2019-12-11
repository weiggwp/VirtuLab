package backend.dto;

import backend.model.Lab;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class PageRequestDTO {

    @JsonProperty("email")
    private String email;

    @JsonProperty("pageNum")
    private int pageNum;

    @JsonProperty("perPage")
    private int perPage;

    private long totalElements;

    private int totalPages;

    private List<Lab> labs;

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<Lab> getLabs() {
        return labs;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    @Override
    public String toString() {
        return "PageRequestDTO{" +
                "email='" + email + '\'' +
                ", pageNum=" + pageNum +
                ", perPage=" + perPage +
                ", totalElements=" + totalElements +
                ", totalPages=" + totalPages +
                '}';
    }
}
