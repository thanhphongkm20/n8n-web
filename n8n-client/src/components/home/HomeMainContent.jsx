import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Rating,
  Divider,
  InputAdornment
} from '@mui/material';
import { ShieldCheck, Search } from "lucide-react";
import { COLORS } from '../common/Colors';
import StackRow from '../common/StackRow';
import Animate from '../common/Animate';

const HomeMainContent = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#F9FAFB' }}>
      {/* HERO */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 8, textAlign: 'center' }}>
        <Animate type="fade">
          <Typography
            variant="h2"
            fontWeight="900"
            color={COLORS.BLACK}
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' }, letterSpacing: "-1px" }}
          >
            Master Your Automations with <br />
            Expert <Box component="span" sx={{ color: COLORS.SECONDARY }}>n8n</Box> Workflows
          </Typography>

          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Browse our curated Marketplace for pre-built solutions or Request a Custom Build tailored perfectly to your unique business needs.
          </Typography>

          <StackRow justifyContent="center" gap={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: COLORS.BLACK,
                color: 'white',
                px: 5,
                py: 2,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                "&:hover": { bgcolor: "#333" }
              }}
            >
              EXPLORE WORKFLOWS
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: COLORS.BLACK,
                borderColor: COLORS.BLACK,
                px: 5,
                py: 2,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                "&:hover": {
                  borderColor: COLORS.BLACK,
                  bgcolor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              GET CUSTOM QUOTE
            </Button>
          </StackRow>
        </Animate>
      </Container>

      {/* MAIN */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>

          {/* LEFT */}
          <Grid xs={12} md={8}>
            <StackRow justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" color={COLORS.BLACK}>
                Featured n8n Workflows
              </Typography>

              <TextField
                placeholder="Search workflows..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color="#aaa" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </StackRow>

            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid xs={12} sm={6} key={item}>
                  <Animate type="fade" delay={item * 100}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        border: COLORS.BORDER_SOLID,
                        boxShadow: 'none',
                        height: '100%',
                        transition: '0.2s',
                        "&:hover": {
                          borderColor: COLORS.SECONDARY,
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: '#EEF2F5',
                          height: 160,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="caption" color="textSecondary">
                          Workflow Diagram Preview
                        </Typography>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="800"
                          gutterBottom
                          color={COLORS.BLACK}
                        >
                          Telegram Bot Automation
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mb: 3, height: 40, overflow: 'hidden' }}
                        >
                          Telegram Bot automation emails your telegram for your next sheets...
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <StackRow justifyContent="space-between" alignItems="center">
                          <Rating value={5} readOnly size="small" />
                          <Typography variant="body2" color="textSecondary">
                            3 reviews
                          </Typography>
                        </StackRow>

                        <StackRow justifyContent="space-between" sx={{ mt: 3 }} gap={1.5}>
                          <Button variant="outlined" size="small" fullWidth sx={{ textTransform: 'none' }}>
                            PREVIEW
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            sx={{ bgcolor: COLORS.SECONDARY, textTransform: 'none' }}
                          >
                            BUY ($XX)
                          </Button>
                        </StackRow>
                      </CardContent>
                    </Card>
                  </Animate>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT */}
          <Grid xs={12} md={4}>
            <Animate type="slide" direction="up">
              <Box
                sx={{
                  p: 4,
                  bgcolor: 'white',
                  borderRadius: 3,
                  border: COLORS.BORDER_SOLID,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <StackRow alignItems="center" gap={1.5} sx={{ mb: 3 }}>
                  <ShieldCheck size={28} color={COLORS.SECONDARY} strokeWidth={2.5} />
                  <Typography variant="h6" fontWeight="bold" color={COLORS.BLACK}>
                    Request Custom Workflow
                  </Typography>
                </StackRow>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                  Need a bespoke n8n automation? Tell us what you need, and we'll build it.
                </Typography>

                <StackRow direction="column" gap={2}>
                  <TextField fullWidth label="Full Name" size="small" variant="filled" />
                  <TextField fullWidth label="Work Email" size="small" variant="filled" />
                  <TextField fullWidth label="Business Name" size="small" variant="filled" />
                  <TextField
                    fullWidth
                    label="Core Requirement"
                    size="small"
                    variant="filled"
                    multiline
                    rows={4}
                    placeholder="e.g., Integrate HubSpot with Slack to notify team of new leads."
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: COLORS.BLACK,
                      color: 'white',
                      py: 1.5,
                      mt: 2,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "#333" }
                    }}
                  >
                    SUBMIT REQUEST
                  </Button>
                </StackRow>
              </Box>
            </Animate>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default HomeMainContent;