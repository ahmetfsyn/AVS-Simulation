/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import AddCard from '../../components/Card/AddCard';
import {useGetWaterCards} from '../../hooks/useGetWaterCards';
import WaterCardInfoCard from '../../components/Card/WaterCardInfoCard';
import WaterCard from '../../components/Card/WaterCard';
import PageInfoCard from '../../components/Card/PageInfoCard';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleDialog, setVisibleDialog] = useState(false);
  // const routeParams: any = useRoute().params;
  const {user} = useSelector((state: RootState) => {
    return state.auth;
  }, shallowEqual);

  const {loadingWaterCards} = useGetWaterCards({
    subscriberNo: user?.subscriberNo,
    userId: user?.id,
  });

  const waterCards = useSelector(
    (state: RootState) => state.waterCard.waterCards,
  );

  const meters = useSelector((state: RootState) => state.meter.meters);

  // console.log('meters : ', meters);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 15,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Marquee */}
        {/* <MarqueeBanner text="Tarsus Belediyesi Mobil Uygulamasına Hoşgeldiniz." /> */}
        {/* Carousel */}
        <View>
          {loadingWaterCards ? (
            <ActivityIndicator size="large" color={theme.colors.onBackground} />
          ) : waterCards?.length > 0 ? (
            <CustomCarousel
              data={waterCards}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              renderItem={(item, index) => {
                return (
                  <WaterCard
                    key={index}
                    waterCard={item}
                    meter={meters[index]}
                  />
                );
              }}
            />
          ) : (
            <AddCard navigation={navigation} path="NfcReaderToAddWaterCard" />
          )}
        </View>

        {/* Kart Bilgileri */}
        <View>
          {loadingWaterCards ? (
            <ActivityIndicator />
          ) : waterCards?.length > 0 ? (
            <WaterCardInfoCard
              waterCard={waterCards[activeIndex]}
              meter={meters[activeIndex]}
            />
          ) : (
            <PageInfoCard text="Kartınız bulunamadı" variant="bodyLarge" />
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
                waterCard: waterCards[activeIndex],
                meter: meters[activeIndex],
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
