import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

import articleApi from "../../api/article.api";
import ButtonDelete from "../../components/common/ButtonDelete";
import { ButtonEdit } from "../../components/common/ButtonEdit";
import { BG_COLORS, COLORS } from "../../components/common/Colors";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import StackRow from "../../components/common/StackRow";
import DialogDeleteAlert from "../../components/dialog/DialogDeleteAlert";
import CustomPagination from "../../components/pagination/CustomPagination";
import { ROUTES, ROUTES_GEN } from "../../configs/routes";
import { LoadingPage } from "../bases/LoadingPage";

const ArticleListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [articles, setArticles] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [reload, setReload] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleChangePage = (_, value) => {
    setSearchParams({ page: value.toString() });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      try {
        setIsLoadingTable(true);

        const res = await articleApi.list({ page: currentPage });
        const response = res.data || res;

        if (!isMounted) return;

        const data = Array.isArray(response.posts) ? response.posts : [];
        setArticles(data);

        if (response.total) {
          setPageCount(Math.ceil(response.total / 10));
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error?.message);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTable(false);
          setIsLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [currentPage, reload]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await articleApi.remove(deleteId);
      toast.success("Deleted successfully");
      setReload((r) => r + 1);
    } catch (error) {
      toast.error(error?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
      setOpenDelete(false);
      setDeleteId(null);
    }
  };

  const handleCreate = () => {
    navigate(ROUTES.ARTICLE.CREATE);
  };

  const handleDetail = (id) => {
    navigate(ROUTES_GEN.articleUpdate(id));
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>

        <StackRow justifyContent="space-between" alignItems="center">
          <RouteBreadcrumbs />
          <Button
            variant="contained"
            onClick={handleCreate}
            startIcon={<Plus size={20} />}
            sx={{
              width: 150,
              bgcolor: COLORS.SECONDARY,
              "&:hover": { bgcolor: BG_COLORS.BUTTON_HOVER }
            }}
          >
            CREATE
          </Button>
        </StackRow>

        <TableContainer
          component={Paper}
          sx={{
            border: `1px solid ${COLORS.BORDER_COLOR}`,
            borderRadius: "12px",
            bgcolor: COLORS.WHITE,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            opacity: isLoadingTable ? 0.7 : 1,
            transition: "opacity 0.2s"
          }}
        >
          <Table sx={{ minWidth: 850 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: COLORS.BLUE,
                    pl: "30px"
                  }}>
                  TITLE
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: COLORS.BLUE
                  }}>
                  PRICE
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: COLORS.BLUE
                  }}>
                  STATUS
                </TableCell>
                <TableCell sx={{ width: 80 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((item) => (
                <TableRow key={item._id || item.id} hover>
                  <TableCell sx={{ pl: "30px" }}>{item.title}</TableCell>
                  <TableCell>{item.price_formatted}</TableCell>
                  <TableCell>
                    <Box sx={{ fontWeight: 500, textTransform: 'uppercase' }}>
                      {item.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: "30px" }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <ButtonEdit onClick={() => handleDetail(item._id || item.id)} />
                      <ButtonDelete onClick={() => handleDeleteClick(item._id || item.id)} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {articles.length > 0 && (
          <StackRow justifyContent="flex-start">
            <CustomPagination
              page={currentPage}
              pageCount={pageCount}
              onChange={handleChangePage}
            />
          </StackRow>
        )}
      </Box>
      <DialogDeleteAlert
        title="Delete article"
        description="Are you sure you want to delete this article?"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default ArticleListPage;