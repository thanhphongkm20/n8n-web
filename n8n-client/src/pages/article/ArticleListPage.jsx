import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonEdit } from "../../components/common/ButtonEdit";
import { BG_COLORS, COLORS } from "../../components/common/Colors";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import StackRow from "../../components/common/StackRow";
import CustomPagination from "../../components/pagination/CustomPagination";
import { ROUTES, ROUTES_GEN } from '../../configs/routes';
import { LoadingPage } from "../bases/LoadingPage";
import articleApi from "../../api/article.api";
import { Plus } from "lucide-react";

const ArticleListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"));

  const [articles, setArticles] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

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
  }, [currentPage]);

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
                    <ButtonEdit onClick={() => handleDetail(item._id || item.id)} />
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
    </Box>
  );
};

export default ArticleListPage;