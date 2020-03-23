// @flow

import React from "react";
import styled from "styled-components";

import { Trans } from "react-i18next";
import { formatCurrencyUnit } from "@ledgerhq/live-common/lib/currencies";
import { BigNumber } from "bignumber.js";

import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

import Box from "~/renderer/components/Box/Box";
import Text from "~/renderer/components/Text";
import InfoCircle from "~/renderer/icons/InfoCircle";
import ToolTip from "~/renderer/components/Tooltip";

const Wrapper: ThemedComponent<*> = styled(Box).attrs(() => ({
  horizontal: true,
  mt: 4,
  p: 5,
  pb: 0,
}))`
  border-top: 1px solid ${p => p.theme.colors.palette.text.shade10};
`;

const BalanceDetail = styled(Box).attrs(() => ({
  flex: 1.25,
  vertical: true,
  alignItems: "start",
}))`
  &:nth-child(n + 3) {
    flex: 0.75;
  }
`;

const TitleWrapper = styled(Box).attrs(() => ({ horizontal: true, alignItems: "center", mb: 1 }))``;

const Title = styled(Text).attrs(() => ({
  fontSize: 4,
  ff: "Inter|Medium",
  color: "palette.text.shade60",
}))`
  line-height: ${p => p.theme.space[4]}px;
  margin-right: ${p => p.theme.space[1]}px;
`;

const AmountValue = styled(Text).attrs(() => ({
  fontSize: 6,
  ff: "Inter|SemiBold",
  color: "palette.text.shade100",
}))``;

type Props = {
  account: any,
  countervalue: any,
};

const formatConfig = {
  disableRounding: true,
  alwaysShowSign: false,
  showCode: true,
};

const AccountBalanceSummaryFooter = ({ account, countervalue }: Props) => {
  if (!account.tronResources) return null;

  const {
    frozen: {
      bandwidth: { amount: bandwidthAmount } = {},
      energy: { amount: energyAmount } = {},
    } = {},
    energy,
    bandwidth: { freeUsed, freeLimit, gainedUsed, gainedLimit } = {},
  } = account.tronResources;

  const spendableBalance = formatCurrencyUnit(account.unit, account.spendableBalance, formatConfig);

  const frozenAmount = formatCurrencyUnit(
    account.unit,
    BigNumber(bandwidthAmount || 0).plus(BigNumber(energyAmount || 0)),
    formatConfig,
  );

  const formatedEnergy = energy && energy.gt(0) ? energy : null;

  const formatedBandwidth = freeLimit
    .plus(gainedLimit)
    .minus(gainedUsed)
    .minus(freeUsed);

  return (
    <Wrapper>
      <BalanceDetail>
        <ToolTip content={<Trans i18nKey="account.availableBalance" />}>
          <TitleWrapper>
            <Title>
              <Trans i18nKey="account.availableBalance" />
            </Title>
            <InfoCircle size={13} />
          </TitleWrapper>
        </ToolTip>
        <AmountValue>{spendableBalance}</AmountValue>
      </BalanceDetail>
      <BalanceDetail>
        <ToolTip content={<Trans i18nKey="account.frozenAssets" />}>
          <TitleWrapper>
            <Title>
              <Trans i18nKey="account.frozenAssets" />
            </Title>
            <InfoCircle size={13} />
          </TitleWrapper>
        </ToolTip>
        <AmountValue>{frozenAmount}</AmountValue>
      </BalanceDetail>
      <BalanceDetail>
        <ToolTip content={<Trans i18nKey="account.bandwidth" />}>
          <TitleWrapper>
            <Title>
              <Trans i18nKey="account.bandwidth" />
            </Title>
            <InfoCircle size={13} />
          </TitleWrapper>
        </ToolTip>
        <AmountValue>{`${formatedBandwidth || "–"}`}</AmountValue>
      </BalanceDetail>
      <BalanceDetail>
        <ToolTip content={<Trans i18nKey="account.energy" />}>
          <TitleWrapper>
            <Title>
              <Trans i18nKey="account.energy" />
            </Title>
            <InfoCircle size={13} />
          </TitleWrapper>
        </ToolTip>
        <AmountValue>{`${formatedEnergy || "–"}`}</AmountValue>
      </BalanceDetail>
    </Wrapper>
  );
};

export default AccountBalanceSummaryFooter;
