import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

const InstistionHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }} // user image
          style={styles.profileImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Hello, Welcome</Text>
          <Text style={styles.userName}>Lincoln Bergson</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={{ fontSize: 18 }}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Create New Shift */}
        <TouchableOpacity style={[styles.card, styles.createShiftCard]}>
          <Text style={styles.createShiftText}>+ Create New Shift</Text>
        </TouchableOpacity>

        {/* Grid buttons */}
        <View style={styles.grid}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#A26BFF' }]}>
            <Text style={styles.cardText}>Posted Shifts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#00C48C' }]}>
            <Text style={styles.cardText}>Shift Booking Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#00BFFF' }]}>
            <Text style={styles.cardText}>Booked Shifts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#3A85FF' }]}>
            <Text style={styles.cardText}>Past Shifts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: '#FFD966' }]}>
            <Text style={styles.cardText}>Inbox</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default InstistionHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF007A', // Header background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    marginRight: 10,
  },
  menuButton: {},
  scrollContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 50,
  },
  card: {
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  createShiftCard: {
    backgroundColor: '#FF007A',
    marginBottom: 20,
  },
  createShiftText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
