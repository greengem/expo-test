// index.tsx
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePurchases, useAddPurchase, useDeletePurchase } from '../store';

interface Purchase {
  id: number;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export default function TabDashboardScreen() {
  const purchases = usePurchases();
  const deletePurchase = useDeletePurchase();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        {purchases.map((purchase) => (
          <View key={purchase.id} style={styles.purchaseItem}>
            <Text>Amount: ${purchase.amount}</Text>
            <Text>Category: {purchase.category}</Text>
            <Text>Date: {purchase.date}</Text>
            {purchase.note && <Text>Note: {purchase.note}</Text>}
            <Button
              title="Delete"
              onPress={() => deletePurchase(purchase.id)} // Call deletePurchase when the button is clicked
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
  purchaseItem: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
  },
});