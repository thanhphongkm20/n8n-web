import { useEffect, useMemo, useState } from "react";
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
import { Check, HelpCircle, ShieldCheck, ShoppingCart } from "lucide-react";

import articleApi from "../../api/article.api";
import { LoadingPage } from "../bases/LoadingPage";
import orderApi from "../../api/order.api";
import ArticleHeroMedia from "../../components/article/ArticleHeroMedia";
import ArticleFaq from "../../components/article/ArticleFaq";
import OrderConfirmModal from "../../components/payment/OrderConfirmModal";
import PaymentQrModal from "../../components/payment/PaymentQrModal";
import { faqs } from "../../configs/constants";

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

  const priceText = useMemo(() => {
    if (!article) return "";
    return (
      article.price_formatted ||
      `${article.price?.toLocaleString("vi-VN")} ₫`
    );
  }, [article]);

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
                <Typography
                  sx={{
                    fontSize: { xs: 34, md: 42 },
                    fontWeight: 950,
                    lineHeight: 1,
                    color: "#ffffff",
                    letterSpacing: "-0.04em",
                    textAlign: "left",
                  }}
                >
                  {priceText}
                </Typography>

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
                  {[
                    "n8n workflow .json file",
                    "Setup documentation",
                    "Video walkthrough",
                    "30-day author support",
                    "Free lifetime updates",
                    "Commercial use license",
                  ].map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={1.2}
                      alignItems="center"
                    >
                      <Check size={15} color="#10b981" />

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#ffffff",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  ))}
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