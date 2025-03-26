import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Portal, Text, useTheme} from 'react-native-paper';
import CustomCarousel from '../../components/CustomCarousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/Button/CustomButton';
import {Marquee} from '@animatereactnative/marquee';
import {useNavigation} from '@react-navigation/native';
import NfcManager from 'react-native-nfc-manager';
import {showMessage} from '../../utils/showMessage';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import AddCard from '../../components/Card/AddCard';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const waterCards = useSelector((state: RootState) => state.app.waterCards);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [visibleDialog, setVisibleDialog] = useState(false);

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
          {waterCards.length > 0 ? (
            <CustomCarousel data={waterCards} setActiveIndex={setActiveIndex} />
          ) : (
            <AddCard navigation={navigation} path="NfcReaderToAddWaterCard" />
          )}
        </View>

        {/* Kart Bilgileri */}
        <View>
          <Card>
            <Card.Title title="Kart Bilgileri" titleVariant="titleMedium" />
            {waterCards.length > 0 ? (
              <Card.Content
                style={{
                  gap: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="wallet"
                    size={24}
                    color={theme.colors.onBackground}
                  />
                  <Text variant="labelLarge">Bakiye:</Text>
                  <Text variant="bodyLarge">
                    {waterCards[activeIndex]?.balance} TL
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="cash-minus"
                    size={24}
                    color={theme.colors.onBackground}
                  />
                  <Text variant="labelLarge">Borç:</Text>
                  <Text variant="bodyLarge">
                    {waterCards[activeIndex]?.debt} TL
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="cog-counterclockwise"
                    size={24}
                    color={theme.colors.onBackground}
                  />
                  <Text variant="labelLarge">Sayaç No:</Text>
                  <Text variant="bodyLarge">1231233</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="water-pump"
                    size={24}
                    color={theme.colors.onBackground}
                  />
                  <Text variant="labelLarge">Kullanılan Su (m³):</Text>
                  <Text variant="bodyLarge">1231233</Text>
                </View>
              </Card.Content>
            ) : (
              <Card.Content>
                <Text variant="bodyLarge">Kart bulunamadı.</Text>
              </Card.Content>
            )}
          </Card>
        </View>

        {/* Bakiye Yükle Butonu */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <CustomButton
            mode="contained-tonal"
            onPress={async () => {
              if (nfcEnabled) {
                return navigation.navigate('PayForKiosk');
              } else {
                return showMessage({
                  type: 'error',
                  text1: 'Hata',
                  text2: 'Lütfen NFC modülünü aktif ediniz.',
                });
              }
            }}>
            Ödeme Yap
          </CustomButton>
          <CustomButton
            mode="contained"
            style={{flex: 1}}
            onPress={() => {
              // if (!waterCards[activeIndex]) {
              //   showMessage({
              //     text1: 'İşlem Başarısız',
              //     text2: 'Lütfen bir su abone kartı ekleyiniz',
              //     type: 'error',
              //   });
              // } else {
              navigation.navigate('LoadCreditInfo');
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
      {/* <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Ödeme Yöntemleri</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Lütfen bir ödeme yöntemi seçiniz.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <CustomButton
              mode="contained"
              onPress={() => setVisibleDialog(false)}>
              Kiosk
            </CustomButton>
            <CustomButton
              mode="contained"
              onPress={() => setVisibleDialog(false)}>
              Done
            </CustomButton>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
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
