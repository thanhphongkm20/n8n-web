import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Rating,
  Divider,
  InputAdornment,
  Button,
  Box,
  Container
} from "@mui/material";
import Search from "../common/Search";
import { Search as SearchIcon } from "lucide-react";
import { COLORS } from "../common/Colors";
import StackRow from "../common/StackRow";
import Animate from "../common/Animate";

const workflows = [1, 2, 3, 4, 5, 6];

const ArticleHomePage = () => {

  const [search, setSearch] = useState("");

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <StackRow
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 5, width: "100%" }}
        >
          <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a" }}>
            Featured Workflows
          </Typography>

          <Box sx={{ width: 280 }}>
            <Search
              value={search}
              onChange={setSearch}
              placeholder="Search workflows..."
            />
          </Box>
        </StackRow>

        {/* Grid */}
        <Grid container spacing={3}>
          {workflows.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Animate type="fade" delay={item * 100}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* Image Placeholder */}
                  <Box
                    sx={{
                      height: 180,
                      background: "linear-gradient(135deg,#e2e8f0,#f8fafc)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Workflow Preview
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography fontWeight={700} variant="h6" noWrap>
                      Telegram Bot Automation
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 1, mb: 2, color: "#64748b", height: 40, overflow: "hidden" }}
                    >
                      Automate Telegram notifications for your workflow.
                    </Typography>

                    {/* Buttons */}
                    <StackRow
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 3,
                        justifyContent: "center",
                        width: "100%"
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          flex: 1,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          borderColor: "#e2e8f0",
                          color: "#475569",
                          "&:hover": {
                            borderColor: COLORS.SECONDARY,
                            color: COLORS.SECONDARY,
                          },
                        }}
                      >
                        Preview
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          flex: 1,
                          bgcolor: COLORS.SECONDARY,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 700,
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: COLORS.SECONDARY,
                            filter: "brightness(0.9)",
                          },
                        }}
                      >
                        Buy
                      </Button>
                    </StackRow>
                  </CardContent>
                </Card>
              </Animate>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleHomePage;