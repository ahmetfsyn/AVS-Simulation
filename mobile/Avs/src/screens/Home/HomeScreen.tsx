import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import CustomCarousel from "../../components/CustomCarousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomButton from "../../components/Button/CustomButton";
import { Marquee } from "@animatereactnative/marquee";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    balance: 100,
    subscriberNo: "1231233",
    cardCompany: "Baylan",
    debt: 250.5,
  },
  {
    id: 2,
    name: "Ahmet Yılmaz",
    balance: 0,
    subscriberNo: "2332322",
    cardCompany: "Metlab",
    debt: 0,
  },
];
const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  // const [payModal, setPayModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    abstractCard: {
      backgroundColor: theme.colors.cardBackground,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
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
          {data.length > 0 ? (
            <CustomCarousel
              data={data}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            ></CustomCarousel>
          ) : (
            <Text variant="headlineSmall">Kartınız Bulunmamaktadır</Text>
          )}
        </View>

        {/* Kart Bilgileri */}
        <View>
          <Card style={styles.abstractCard}>
            <Card.Title
              title="Kart Bilgileri"
              titleVariant="titleMedium"
            ></Card.Title>

            <Card.Content
              style={{
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="wallet"
                  size={24}
                  color={theme.colors.onBackground}
                ></Ionicons>
                <Text variant="labelLarge">Bakiye:</Text>
                <Text variant="bodyLarge">{data[activeIndex].balance} TL</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="cash-minus"
                  size={24}
                  color={theme.colors.onBackground}
                ></MaterialCommunityIcons>
                <Text variant="labelLarge">Borç:</Text>
                <Text variant="bodyLarge">{data[activeIndex].debt} TL</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="cog-counterclockwise"
                  size={24}
                  color={theme.colors.onBackground}
                ></MaterialCommunityIcons>
                <Text variant="labelLarge">Sayaç No:</Text>
                <Text variant="bodyLarge">1231233</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="water-pump"
                  size={24}
                  color={theme.colors.onBackground}
                ></MaterialCommunityIcons>
                <Text variant="labelLarge">Kullanılan Su (m³):</Text>
                <Text variant="bodyLarge">1231233</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Bakiye Yükle Butonu */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <CustomButton
            mode="contained-tonal"
            onPress={() => navigation.navigate("PayForKiosk")}
          >
            Ödeme Yap
          </CustomButton>
          <CustomButton mode="contained" style={{ flex: 1 }}>
            Bakiye Yükle
          </CustomButton>
        </View>

        {/* Hızlı İşlemler */}
        <View>
          <Card style={styles.abstractCard}>
            <Card.Title
              title="Hızlı İşlemler"
              titleVariant="titleMedium"
            ></Card.Title>

            <Card.Content
              style={{
                display: "flex",
                gap: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <CustomButton
                icon={() => (
                  <Ionicons
                    color={theme.colors.secondary}
                    size={24}
                    name="receipt"
                  />
                )}
                mode="contained"
              >
                Fatura Sorgula
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    size={24}
                    color={theme.colors.primary}
                    name="credit-card"
                  />
                )}
                mode="contained-tonal"
              >
                Fatura Öde
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    color={theme.colors.secondary}
                    size={24}
                    name="account-balance"
                  />
                )}
                mode="contained"
              >
                Vergi ve Harç Öde
              </CustomButton>
              <CustomButton
                icon={() => (
                  <MaterialCommunityIcons
                    color={theme.colors.primary}
                    size={24}
                    name="format-list-bulleted"
                  />
                )}
                mode="contained-tonal"
              >
                Kartlarım
              </CustomButton>

              <CustomButton
                icon={() => (
                  <MaterialIcons
                    size={24}
                    color={theme.colors.secondary}
                    name="local-offer"
                  />
                )}
                mode="contained"
              >
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
                mode="contained-tonal"
              >
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
                onPressIn={() => navigation.navigate("ServicePoints")}
                mode="contained"
              >
                Hizmet Noktaları
              </CustomButton>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* <View>
        <Card style={styles.abstractCard}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tarih</DataTable.Title>
                <DataTable.Title numeric>Tutar</DataTable.Title>
                <DataTable.Title numeric>Sonuç</DataTable.Title>
              </DataTable.Header>

              {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
              />
            </DataTable>
          </Card.Content>
        </Card>
      </View> */}
    </View>
  );
};

export default HomeScreen;
("");
