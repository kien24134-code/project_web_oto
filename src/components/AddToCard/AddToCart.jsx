import styles from "./AddToCart.module.css"

export default function AddToCart({qty, setQty, onAddToCart}){
  return(
    <>
      <div className={styles.cartBox}>
                      <div className={styles.qtyRow}>
                        <span className={styles.qtyLabel}>Số lượng</span>
      
                        <div className={styles.qtyControl}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => setQty((p) => Math.max(1, p - 1))}
                          >
                            −
                          </button>
      
                          <span className={styles.qtyValue}>{qty}</span>
      
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => setQty((p) => p + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
      
                      <button
                        className={styles.btnPrimary}
                        type="button"
                        onClick={onAddToCart}
                      >
                        Thêm vào giỏ hàng
                      </button>
      
                    </div>
    </>
  )
}