import { StyleSheet, Dimensions } from "react-native";
  

 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3178B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 25,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 2,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
    position: 'relative',
  },
  headerIcon: {
    width: 33,
    height: 33,
    resizeMode: "contain",
    tintColor: "white"
  },
  scrollContent: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    minHeight: '100%',
  },
  createShiftCard: {
    backgroundColor: '#F3178B',
    borderRadius: 18,
     elevation: 5,
    shadowColor: '#F3178B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8, 
    marginTop:15 ,
    height:120 , 
    alignItems:"center",
    justifyContent:"center"
  },
  createShiftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    marginRight: 10,
  },
  createShiftText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    color: '#F3178B',
    fontSize: 14,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25, 
    marginTop:50
  },
  gridCard: {
    width: '48%',
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', 
    alignItems:"center" ,
    justifyContent:"center" ,
    height:120,
  },
  gridCardContent: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    marginBottom: 15,
  },
  gridCardText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  shiftCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  shiftCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  shiftTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  shiftCardBody: {
    padding: 15,
  },
  shiftInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: '#666',
  },
  shiftInfoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  nurseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  warningText: {
    color: '#FF3B30',
  },
  successText: {
    color: '#4CD964',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  viewDetailsText: {
    color: '#F3178B',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#F3178B',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },

});
