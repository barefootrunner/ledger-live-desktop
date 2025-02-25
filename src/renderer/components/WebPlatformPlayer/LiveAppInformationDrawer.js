// @flow

import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { SideDrawer } from "~/renderer/components/SideDrawer";
import Box from "~/renderer/components/Box";
import { openURL } from "~/renderer/linking";

import { closePlatformAppInfo } from "~/renderer/actions/UI";
import { platformAppInfoStateSelector } from "~/renderer/reducers/UI";

import Text from "../Text";
import ExternalLink from "../ExternalLink/index";
import AppDetails from "../Platform/AppDetails";

const Divider = styled(Box).attrs(() => ({
  my: 5,
}))`
  border: 1px solid rgba(20, 37, 51, 0.1);
`;

export const LiveAppInformationDrawer = () => {
  const { isOpen, manifest } = useSelector(platformAppInfoStateSelector);

  const { homepageUrl } = manifest || {};

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    openURL(homepageUrl);
  }, [homepageUrl]);

  return (
    <SideDrawer
      title={t(`platform.app.informations.title`)}
      isOpen={isOpen}
      onRequestClose={() => {
        dispatch(closePlatformAppInfo());
      }}
      direction="left"
    >
      <Box pt={7} px={6}>
        <AppDetails manifest={manifest} />

        <Divider />

        <Text ff="Inter|SemiBold">{t(`platform.app.informations.website`)}</Text>
        <Text ff="Inter" color="#6490F1">
          <ExternalLink label={homepageUrl} isInternal={false} onClick={onClick} />
        </Text>
      </Box>
    </SideDrawer>
  );
};
