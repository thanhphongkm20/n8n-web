import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Check,
  HelpCircle,
  ShieldCheck,
  ShoppingCart,
  Flame,
  Tag,
  FileCode,
  BookOpen,
  Play,
  Headphones,
  RefreshCw,
  BadgeCheck,
  BarChart2,
  Cpu,
  Hash,
  Clock,
} from "lucide-react";

import articleApi from "../../api/article.api";
import { LoadingPage } from "../bases/LoadingPage";
import orderApi from "../../api/order.api";
import ArticleHeroMedia from "../../components/article/ArticleHeroMedia";
import ArticleFaq from "../../components/article/ArticleFaq";
import OrderConfirmModal from "../../components/payment/OrderConfirmModal";
import PaymentQrModal from "../../components/payment/PaymentQrModal";
import { faqs, N8N_COMMON_NODES, PURCHASEITEMS } from "../../configs/constants";

const ArticleDetailPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [slug]);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await articleApi.getBySlug(slug);

        if (res?.success && res?.data) {
          setArticle(res.data);
        } else {
          setError("Article not found");
        }
      } catch (error) {
        console.error("Failed to fetch article detail:", error);
        setError("Failed to load article detail");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (!openPayment || !currentOrder?.orderId) return;

    const checkPaymentStatus = async () => {
      try {
        const res = await orderApi.getById(currentOrder.orderId);

        if (res?.success && res?.data?.status === "paid") {
          setPaid(true);
          setOpenPayment(false);
        }
      } catch (error) {
        console.error("Check payment failed:", error);
      }
    };

    checkPaymentStatus();

    const interval = setInterval(checkPaymentStatus, 3000);

    return () => clearInterval(interval);
  }, [openPayment, currentOrder?.orderId]);

  const handleCreateOrder = async () => {
    try {
      setCreatingOrder(true);

      const res = await orderApi.create(article._id);

      if (res?.success && res?.data) {
        setCurrentOrder(res.data);
        setOpenConfirm(false);
        setOpenPayment(true);
      } else {
        console.error("Create order failed response:", res);
      }
    } catch (error) {
      console.error("Create order failed:", error);
    } finally {
      setCreatingOrder(false);
    }
  };

  const handleDownload = () => {
    if (!article?.workflow) return;
    window.open(article.workflow, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !article) {
    return (
      <Box
        sx={{
          bgcolor: "#05070d",
          minHeight: "100vh",
          color: "#fff",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography fontSize={28} fontWeight={900}>
            {error || "Article not found"}
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ bgcolor: "#05070d", minHeight: "80vh", color: "#fff" }}>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 7fr) minmax(320px, 3fr)",
              },
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <Box>
              <ArticleHeroMedia image={article.image} />

              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                {article.badge && (
                  <Box sx={{
                    display: "inline-flex", alignItems: "center", gap: 0.6,
                    px: 1.4, py: 0.5, borderRadius: 999,
                    bgcolor: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}>
                    <Flame size={20} color="#f87171" />
                    <Typography sx={{ fontSize: 11, fontWeight: 900, color: "#f87171", letterSpacing: "0.08em" }}>
                      {article.badge.toUpperCase()}
                    </Typography>
                  </Box>
                )}
                {article.category && (
                  <Box sx={{
                    px: 1.4, py: 0.5, borderRadius: 999,
                    bgcolor: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 900, color: "#10b981", letterSpacing: "0.08em" }}>
                      {article.category.toUpperCase()}
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Stack direction="row" spacing={2.5} sx={{ mt: 1.5, flexWrap: "wrap" }} alignItems="center">
                {[
                  { icon: <BarChart2 size={16} />, label: `${article.sales_count} sales` },
                  { icon: <Cpu size={16} />, label: `${article.node_count ?? 0} nodes` },
                  { icon: <Hash size={16} />, label: article.slug },
                ].map(({ icon, label }) => (
                  <Stack key={label} direction="row" spacing={0.6} alignItems="center">
                    <Box sx={{ color: "#4a5568", display: "flex" }}>{icon}</Box>
                    <Typography sx={{ fontSize: 14, color: "#6b7a99", fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Typography
                component="h1"
                sx={{
                  mt: 2,
                  fontSize: { xs: 28, md: 36 },
                  fontWeight: 950,
                  lineHeight: 1.08,
                  letterSpacing: "-0.04em",
                  textAlign: "left",
                }}
              >
                {article.title}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  maxWidth: 760,
                  textAlign: "left",
                }}
              >
                {article.description}
              </Typography>

              <Section
                title="Frequently asked questions"
                icon={<HelpCircle size={16} />}
              >
                <ArticleFaq items={faqs} />
                {!!article.node_count && (
                  <Section title="Workflow nodes" icon={<Cpu size={16} />}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {N8N_COMMON_NODES.slice(0, Math.min(8, article.node_count)).map((node) => (
                        <Box
                          key={node}
                          sx={{
                            display: "inline-flex", alignItems: "center", gap: 0.8,
                            px: 1.5, py: 0.75, borderRadius: 2.5,
                            bgcolor: "#0d1322",
                            border: "1px solid rgba(255,255,255,0.07)",
                            transition: "border-color 0.15s",
                            "&:hover": { borderColor: "rgba(16,185,129,0.3)" },
                          }}
                        >
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#10b981", flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
                            {node}
                          </Typography>
                        </Box>
                      ))}

                      {article.node_count > 8 && (
                        <Box
                          sx={{
                            display: "inline-flex", alignItems: "center", gap: 0.8,
                            px: 1.5, py: 0.75, borderRadius: 2.5,
                            bgcolor: "rgba(16,185,129,0.05)",
                            border: "1px dashed rgba(16,185,129,0.25)",
                          }}
                        >
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "rgba(16,185,129,0.4)", flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 13, color: "#6b7a99", fontWeight: 500 }}>
                            +{article.node_count - 8} more nodes
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Section>
                )}
              </Section>
            </Box>

            <Box sx={{ position: { lg: "sticky" }, top: 90 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#070b12",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Box>
                  {!!article.discount && (
                    <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: "rgba(255,255,255,0.4)",
                          textDecoration: "line-through",
                          textDecorationThickness: "2px",
                        }}
                      >
                        ${article.price}
                      </Typography>

                      <Box
                        sx={{
                          px: 1.2,
                          py: 0.45,
                          borderRadius: 999,
                          bgcolor: "rgba(16,185,129,0.15)",
                          border: "1px solid rgba(16,185,129,0.25)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#10b981",
                            fontSize: 12,
                            fontWeight: 900,
                          }}
                        >
                          SALE {article.discount}%
                        </Typography>
                      </Box>
                    </Stack>
                  )}

                  <Typography
                    sx={{
                      fontSize: { xs: 40, md: 52 },
                      fontWeight: 950,
                      lineHeight: 1,
                      color: "#ffffff",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {article.price_formatted}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#94a3b8",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    One-time payment • Lifetime access
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCart size={18} />}
                  onClick={paid ? handleDownload : () => setOpenConfirm(true)}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: "#10b981",
                    color: "#04110d",
                    fontWeight: 950,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#34d399" },
                  }}
                >
                  {paid ? "Download workflow" : "Buy workflow"}
                </Button>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.08)" }} />

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    mb: 2,
                  }}
                >
                  THIS PURCHASE INCLUDES
                </Typography>

                <Stack spacing={1.4}>
                  {PURCHASEITEMS.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Stack
                        key={item.label}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 1.5,
                            bgcolor: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#10b981",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#ffffff",
                            fontWeight: 500,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.08)" }} />

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: "rgba(16,185,129,0.16)",
                    border: "1px solid rgba(16,185,129,0.22)",
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <ShieldCheck size={16} color="#10b981" />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#ffffff",
                        fontWeight: 500,
                        textAlign: "left",
                      }}
                    >
                      30-day money-back guarantee. No questions asked.
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <OrderConfirmModal
        open={openConfirm}
        article={article}
        loading={creatingOrder}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleCreateOrder}
      />

      <PaymentQrModal
        open={openPayment}
        order={currentOrder}
        checking={true}
        onClose={() => setOpenPayment(false)}
      />
    </>
  );
};

function Section({ title, icon, children }) {
  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />

      <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 2.5 }}>
        <Box sx={{ color: "#10b981", display: "flex" }}>{icon}</Box>
        <Typography fontWeight={950}>{title}</Typography>
      </Stack>

      {children}
    </Box>
  );
}

export default ArticleDetailPage;