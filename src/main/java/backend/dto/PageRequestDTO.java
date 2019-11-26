package backend.dto;

public class PageRequestDTO {

    private int pageNum;
    private int perPage;

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

    @Override
    public String toString() {
        return "PageRequestDTO{" +
                "pageNum=" + pageNum +
                ", perPage=" + perPage +
                '}';
    }
}
