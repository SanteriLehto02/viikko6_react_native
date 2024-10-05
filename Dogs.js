import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
export default function Dogs() {
    let [data, setData] = useState([])
    let [breedsid, setBreedsid] = useState("5")
    let [breedName, setBreedName] = useState("Akbash Dog")
    let [breeds, setBreeds] = useState([])
    const [displayedDataBreed, setDisplayedBreed] = useState([]);
    const [page, setPage] = useState(0);
    const ITEM_LIMIT = 5;
    
    useEffect(() => {
        setDataFunction()
     }, []);

    useEffect(() => {
        const fetchData = async () => {
            await callApi();
        };
        fetchData();
    }, [breedsid]);

     async function setDataFunction() {
        await callApi()
        await setUpBreeds()
     }

     useEffect(() => {
        if (breeds.length > 0) {
            setDisplayedBreed(breeds.slice(0, ITEM_LIMIT));
        }
    }, [breeds]);
    async function callApi() {
        try {
            console.log("breedsid:",breedsid);
            const link = `https://api.thedogapi.com/v1/images/search?breed_ids=${breedsid}`;
            const response = await fetch(link);
            const json = await response.json();
            console.log(json);
            if (json.length > 0) {
                console.log("url", json[0].url); // Access the first element
                setData(json);
            } else {
                console.error("No data found");
            }
        } catch (error) {
            console.error(error); // Log the error
        }
    }
    

    async function setUpBreeds() {
        try {
            const link = `https://api.thedogapi.com/v1/breeds`
            const response = await fetch(link)
            const json = await response.json()
            //console.log("breeds:",json)
            
            setBreeds(json)
            setDisplayedBreed(breeds.slice(0, ITEM_LIMIT))
        } catch (error) {
            
        }
    }
    const loadMore = () => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const nextData = breeds.slice(ITEM_LIMIT * nextPage, (nextPage + 1) * ITEM_LIMIT);
            setDisplayedBreed(nextData);
            return nextPage;
        });
    };
    
    const loadLess = () => {
        setPage((prevPage) => {
            if (prevPage > 0) {
                const nextPage = prevPage - 1;
                const nextData = breeds.slice(ITEM_LIMIT * nextPage, (nextPage + 1) * ITEM_LIMIT);
                setDisplayedBreed(nextData);
                return nextPage;
            }
            return prevPage; // No change if page is 0
        });
    };
  return (
    <View style={styles.container} >
      <Text style={styles.dogAppText}>Dogs</Text>

      <FlatList
                data={displayedDataBreed}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    console.log('Current Item:', item); // Debugging line
                    return (
                        <View style={styles.item}>
                            <Text
                                style={styles.title}
                                onPress={() => {
                                    console.log('Setting breedsid to:', item.id); // Debugging line
                                    console.log("item pressed" , item);
                                    setBreedsid(item.id)
                                    setBreedName(item.name)
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    );
                }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
      <Button style = {styles.buttonn} onPress={loadMore} title="more breeds"></Button>
      <Button onPress={loadLess} title="less breeds"></Button>
      {data.length > 0 && (
                <><Image
                  source={{
                      uri: data[0].url,
                  }}
                  style={styles.image} /><Text>{breedName}</Text></>
            )}
    
    <Button
        onPress={callApi}
        title="new image"
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    dogAppText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        color: '#333'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonn: {
        paddingBottom: 10,
        borderRadius: 5,
    },
});




