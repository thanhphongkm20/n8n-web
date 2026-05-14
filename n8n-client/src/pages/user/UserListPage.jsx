import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import userApi from "../../api/user.api";
import { ButtonEdit } from "../../components/common/ButtonEdit";
import { COLORS } from "../../components/common/Colors";
import RouteBreadcrumbs from "../../components/common/RouteBreadcrumbs";
import StackRow from "../../components/common/StackRow";
import CustomPagination from "../../components/pagination/CustomPagination";
import { ROUTES_GEN } from "../../configs/routes";
import useParams from "../../hooks/use-params";
import { LoadingPage } from "../bases/LoadingPage";

const UserListPage = () => {
  const navigate = useNavigate();
  const { addParams, getParams } = useParams();

  const initialPage = useMemo(() => {
    const params = getParams();
    return Number(params.page) || 1;
  }, [getParams]);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(1);
  const [query, setQuery] = useState({ page: initialPage });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingTable(true);

        const response = await userApi.list(query);

        setUsers(Array.isArray(response.users) ? response.users : []);
        setPageCount(Math.ceil(response.count / 10));
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoadingTable(false);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  const handleChange = (_, value) => {
    setPage(value);
    addParams(value);
    setQuery({ page: value });
  };

  const handleDetail = (id) => {
    navigate(ROUTES_GEN.userDetail(id));
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <StackRow justifyContent="space-between" alignItems="center">
          <RouteBreadcrumbs />
        </StackRow>

        <TableContainer
          component={Paper}
          sx={{
            border: COLORS.BORDER_TOP_BAR,
            borderRadius: "12px",
            bgcolor: COLORS.WHITE,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 850 }}>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f8f9fa",
                  "& th": {
                    borderBottom: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    color: COLORS.BLUE,
                    pl: "30px",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  FULL NAME
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "normal",
                    color: COLORS.BLUE,
                    pl: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  EMAIL
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "normal",
                    color: COLORS.BLUE,
                    pl: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  PHONE
                </TableCell>

                <TableCell sx={{ width: 80 }} />
              </TableRow>
            </TableHead>

            <TableBody>
              {!isLoadingTable &&
                users.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ pl: "30px" }}>
                      {item.display_name}
                    </TableCell>

                    <TableCell>{item.email}</TableCell>

                    <TableCell>{item.phone}</TableCell>

                    <TableCell align="right" sx={{ pr: "30px" }}>
                      <ButtonEdit onClick={() => handleDetail(item.id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {users.length > 0 && (
          <StackRow justifyContent="flex-start">
            <CustomPagination
              page={page}
              pageCount={pageCount}
              onChange={handleChange}
            />
          </StackRow>
        )}
      </Box>
    </Box>
  );
};

export default UserListPage;