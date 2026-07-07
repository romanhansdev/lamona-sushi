import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { categorias, productos } from '@/data/menu';
import { PROMOS } from '@/data/promos';

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: 'Helvetica',
    backgroundColor: '#fffaf2',
    color: '#181412'
  },
  header: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#d75126',
    paddingBottom: 12
  },
  brand: {
    fontSize: 26,
    fontWeight: 700,
    color: '#d75126'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 10,
    color: '#5f5751'
  },
  section: {
    marginBottom: 10
  },
  category: {
    marginTop: 8,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: 700,
    color: '#d75126'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ead9cb'
  },
  itemText: {
    flex: 1
  },
  name: {
    fontSize: 9.5,
    fontWeight: 700
  },
  description: {
    marginTop: 2,
    fontSize: 8,
    color: '#5f5751'
  },
  price: {
    width: 58,
    textAlign: 'right',
    fontSize: 9.5,
    fontWeight: 700
  }
});

function clp(value: number) {
  return `$${value.toLocaleString('es-CL')}`;
}

export function CartaPDF() {
  return (
    <Document title="Carta La Mona Sushi">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>La Mona Sushi</Text>
          <Text style={styles.subtitle}>Carta completa generada desde los datos de la web</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.category}>Promos de sushi</Text>
          {PROMOS.map((promo) => (
            <View key={promo.id} style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.name}>
                  {promo.nombre} - {promo.piezas} piezas{promo.tipo ? ` ${promo.tipo}` : ''}
                </Text>
                <Text style={styles.description}>{promo.incluye.join(' / ')}</Text>
              </View>
              <Text style={styles.price}>{clp(promo.precio)}</Text>
            </View>
          ))}
        </View>

        {categorias.map((categoria) => {
          const items = productos.filter((producto) => producto.categoria === categoria.id);

          return (
            <View key={categoria.id} style={styles.section}>
              <Text style={styles.category}>{categoria.nombre}</Text>
              {items.map((producto) => (
                <View key={producto.id} style={styles.item}>
                  <View style={styles.itemText}>
                    <Text style={styles.name}>{producto.nombre}</Text>
                    {producto.incluye.length > 0 && (
                      <Text style={styles.description}>{producto.incluye.join(', ')}</Text>
                    )}
                    {producto.notas && (
                      <Text style={styles.description}>{producto.notas}</Text>
                    )}
                  </View>
                  <Text style={styles.price}>{clp(producto.precio)}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
