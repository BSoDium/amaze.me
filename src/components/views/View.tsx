import { Box, CardOverflow, Divider, IconButton, Link, Card, Modal, Tooltip, Typography, ModalClose, Button } from '@mui/joy';
import React, { useState } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { GoBug, GoHeart } from 'react-icons/go';

import Layout from '../Layout';

export default function View({
  info,
  title,
  description,
  children,
}: {
  info: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <Modal
        aria-labelledby={`${title}-modal-title`}
        aria-describedby={`${title}-modal-description`}
        open={focused}
        onClose={() => setFocused(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          variant='outlined'
          sx={{
            width: "min(95%, 900px)",
            height: "min(95%, 900px)",
            boxShadow: "lg"
          }}
        >
          {children}
          <ModalClose
            onClick={() => setFocused(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          />
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              py: 1.5,
              px: 2,
              bgcolor: 'background.level1',
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "0",
                right: 20,
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
              }}
            >
              <Link
                href='https://github.com/BSoDium/rng/issues/new'
                underline='none'
                target='_blank'
              >
                <Button
                  color='warning'
                  size="sm"
                  startDecorator={<GoBug />}
                  sx={{ boxShadow: "sm" }}
                >
                  Report Bug
                </Button>
              </Link>
              <Link
                href='https://github.com/sponsors/BSoDium'
                underline='none'
                target='_blank'
              >
                <Button
                  color='info'
                  size="sm"
                  startDecorator={<GoHeart />}
                  sx={{ boxShadow: "sm" }}
                >
                  Donate
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                {info}
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.primary' }}>
                {title}
              </Typography>
            </Box>
            {description && (
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                {description}
              </Typography>
            )}
          </CardOverflow>
        </Card>
      </Modal>
      <Layout.Tile>
        <Tooltip
          placement="left"
          variant='outlined'
          title="Open interactive view"
        >
          <IconButton
            variant="plain"
            color='neutral'
            onClick={() => setFocused(true)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <BsFullscreen />
          </IconButton>
        </Tooltip>
        <Box sx={{
          height: "100%",
          width: "100%",
          pointerEvents: "none",
        }}>
          {children}
        </Box>
        <CardOverflow
          variant="soft"
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            px: 2,
            bgcolor: 'background.level1',
          }}
        >
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
            {info}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
            {title}
          </Typography>
          {description && (
            <>
              <Divider orientation="vertical" />
              <Tooltip
                placement="top-start"
                variant='outlined'
                title={
                  <Box sx={{
                    maxWidth: 300,
                  }}>
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                      {description}
                    </Typography>
                  </Box>
                }
                arrow
              >
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                  <Link>
                    What am I looking at?
                  </Link>
                </Typography>
              </Tooltip>
            </>
          )}
        </CardOverflow>
      </Layout.Tile>
    </>
  );
}