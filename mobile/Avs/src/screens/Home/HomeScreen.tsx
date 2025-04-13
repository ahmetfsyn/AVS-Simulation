/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {act, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Card,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import CustomCarousel from '../../components/CustomCarousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/Button/CustomButton';
import {Marquee} from '@animatereactnative/marquee';
import {useNavigation} from '@react-navigation/native';
import NfcManager from 'react-native-nfc-manager';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import AddCard from '../../components/Card/AddCard';
import {useGetWaterCards} from '../../hooks/useGetWaterCards';
import WaterCardInfoCard from '../../components/Card/WaterCardInfoCard';
import {useGetMeters} from '../../hooks/useGetMeters';
import {IWaterCard} from '../../models/WaterCard';
import {IMeter} from '../../models/Meter';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [meter, setMeter] = useState<IMeter>();
  const [currentWaterCard] = useState<IWaterCard>();

  const [visibleDialog, setVisibleDialog] = useState(false);

  const {user, accessToken, refreshToken} = useSelector(
    (state: RootState) => state.auth,
  );
  const {isLoading, error} = useGetWaterCards({
    subscriberNo: user?.subscriberNo,
    accessToken,
    userId: user?.id,
  });

  const {isLoading2, error2} = useGetMeters({
    subscriberNo: user?.subscriberNo,
    accessToken,
    userId: user?.id,
  });

  const waterCards = useSelector(
    (state: RootState) => state.waterCard.waterCards,
  );

  const meters = useSelector((state: RootState) => state.meter.meters);

  const getMeterBySelectedWaterCard = (waterCard: IWaterCard) => {
    return meters.find(_meter => _meter.meterNo === waterCard.meterNo);
  };

  useEffect(() => {
    if (meters) {
      setMeter(getMeterBySelectedWaterCard(waterCards[activeIndex]));
    }
  }, [meters, activeIndex]);

  useEffect(() => {
    setMeter(meters[activeIndex]);
  }, [activeIndex]);

  useEffect(() => {
    const isEnabled = async () => {
      const result = await NfcManager.isEnabled();
      setNfcEnabled(result);
    };

    isEnabled();
  }, [nfcEnabled]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          gap: 15,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Marquee */}
        <View>
          <Marquee spacing={24} speed={0.75}>
            <Text variant="titleLarge">
              Tarsus Belediyesi Mobil Uygulamasına Hoşgeldiniz.
            </Text>
          </Marquee>
        </View>

        {/* Carousel */}
        <View>
          {isLoading || isLoading2 ? (
            <ActivityIndicator size="large" color={theme.colors.onBackground} />
          ) : waterCards && waterCards.length > 0 ? (
            <CustomCarousel
              activeIndex={activeIndex}
              data={[waterCards, meters]}
              setActiveIndex={setActiveIndex}
            />
          ) : (
            <AddCard navigation={navigation} path="NfcReaderToAddWaterCard" />
          )}
        </View>

        {/* Kart Bilgileri */}
        <View>
          {isLoading || isLoading2 ? (
            <ActivityIndicator />
          ) : waterCards?.length > 0 ? (
            <WaterCardInfoCard
              waterCard={waterCards[activeIndex]}
              meter={meters[activeIndex]}
            />
          ) : (
            <Card>
              <Card.Content>
                <Text variant="bodyLarge">Kart bulunamadı.</Text>
              </Card.Content>
            </Card>
          )}
        </View>

        {/* Bakiye Yükle Butonu */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <CustomButton
            icon={() => (
              <MaterialCommunityIcons
                name="cash-fast"
                size={20}
                color={theme.colors.primary}
              />
            )}
            mode="contained-tonal"
            onPress={async () => {
              setVisibleDialog(true);
            }}>
            Ödeme Yap
          </CustomButton>
          <CustomButton
            icon={() => (
              <MaterialCommunityIcons
                name="wallet-plus"
                size={20}
                color={theme.colors.secondary}
              />
            )}
            mode="contained"
            style={{flex: 1}}
            onPress={() => {
              navigation.navigate('LoadCreditInfo', {
                waterCardIndex: activeIndex,
              });
              // }
            }}>
            Bakiye Yükle
          </CustomButton>
        </View>

        {/* Hızlı İşlemler */}
        <View>
          <Card>
            <Card.Title title="Hızlı İşlemler" titleVariant="titleMedium" />

            <Card.Content
              style={{
                rowGap: 20,
                columnGap: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              <CustomButton
                icon={() => (
                  <Ionicons
                    color={theme.colors.secondary}
                    size={24}
                    name="receipt"
                  />
                )}
                mode="contained">
                Faturalar
              </CustomButton>
              <CustomButton
                icon={() => (
                  <MaterialCommunityIcons
                    color={theme.colors.secondary}
                    size={24}
                    name="format-list-bulleted"
                  />
                )}
                onPress={() => navigation.navigate('MyCards')}
                mode="contained">
                Kartlarım
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    color={theme.colors.primary}
                    size={24}
                    name="account-balance"
                  />
                )}
                mode="contained-tonal">
                Vergi ve Harç Öde
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    size={24}
                    color={theme.colors.secondary}
                    name="local-offer"
                  />
                )}
                mode="contained">
                Kampanyalar
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    color={theme.colors.primary}
                    size={24}
                    name="feedback"
                  />
                )}
                onPress={() => navigation.navigate('Feedback')}
                mode="contained-tonal">
                Öneri ve Şikayet
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    color={theme.colors.secondary}
                    size={24}
                    name="place"
                  />
                )}
                onPressIn={() => navigation.navigate('ServicePoints')}
                mode="contained">
                Hizmet Noktaları
              </CustomButton>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Message Dialogs */}
      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Ödeme Yöntemleri</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Lütfen bir ödeme yöntemi seçiniz.</Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: 'space-between',
            }}>
            <CustomButton
              mode="contained-tonal"
              onPress={() => setVisibleDialog(false)}>
              QR Kod İle Ödeme
            </CustomButton>
            <CustomButton
              mode="contained"
              onPress={() => {
                setVisibleDialog(false);
                // navigation.navigate();
              }}>
              Temassız Ödeme
            </CustomButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
